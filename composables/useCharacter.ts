import { Quaternion, Vector3 } from 'three'
import { onKeyDown, onKeyUp, watchDebounced } from '@vueuse/core'

export interface CharacterCtrlOptions {
  allowMovement?: boolean
  acceleration?: Vector3
  decceleration?: Vector3
}
export function useCharacterCtrl(character, animations, options: CharacterCtrlOptions = {
  allowMovement: false,
}) {
  const eye = ref('open')
  const action = ref('shevas_iddle_action')

  const { seekByName } = useSeek()

  const eyes = {
    open: seekByName(character.value, '00ShevasEyesOpen'),
    closed: seekByName(character.value, '01ShevasEyesClosed'),
    wink: seekByName(character.value, '02ShevasEyesClosedLeft'),
  }

  watch(eye, (value) => {
    Object.values(eyes).forEach((eye) => {
      if (!eye) return
      eye.visible = false
    })
    eyes[value].visible = true
  }, {
    immediate: true,
  })

  // Eyes
  function wink() {
    eye.value = 'wink'
  }

  function openEyes() {
    eye.value = 'open'
  }

  function closeEyes() {
    eye.value = 'closed'
  }

  function changeEyes(option: string) {
    eye.value = option
  }

  // Animations 

  const { actions, mixer } = useAnimations(animations.value, character)

  const currentAction = ref(actions['shevas_iddle_action'])

  function changeAction(value: string) {
    if (!actions[value]) {
      console.error(`Animation ${value} not found`)
      return
    }
    action.value = value
  }

  watch(action, (value) => {
    if (actions[value] === currentAction.value) return
    if (currentAction.value) {
      currentAction.value.fadeOut(0.2)
    }
  
    currentAction.value = actions[value]
    currentAction.value.reset()
    currentAction.value.fadeIn(0.2)
    currentAction.value.play()
  }, {
    immediate: true,
  })

  function greet() {
    changeAction('shevas_greeting')
    closeEyes()
  }

  currentAction.value.play()

  // Movement

  const isMoving = ref(false)
  const direction = ref('UP')
  const acceleration = ref(new Vector3(0.5, 0.25, 20.0))
  const decceleration = ref(new Vector3(-0.0005, -0.0001, -5.0))
  const velocity = ref(new Vector3(0, 0, 0))

  watch(isMoving, (value) => {
    if (value) {
      currentAction.value.fadeOut(0.2)
      currentAction.value = actions['shevas_walk']
      currentAction.value.reset()
      currentAction.value.fadeIn(0.2)
      currentAction.value.play()
    }
    else {
      currentAction.value.fadeOut(0.2)
      currentAction.value = actions['shevas_iddle_action']
      currentAction.value.reset()
      currentAction.value.fadeIn(0.2)
      currentAction.value.play()
    }
  })
  if (options.allowMovement) {
    onKeyDown(['w', 'W', 'ArrowUp'], (e) => {
      e.preventDefault()
      isMoving.value = true
      direction.value = 'UP'
    })
  
    onKeyDown(['s', 'S', 'ArrowDown'], (e) => {
      e.preventDefault()
      isMoving.value = true
      direction.value = 'DOWN'
    })
  
    onKeyDown(['a', 'A', 'ArrowLeft'], (e) => {
      e.preventDefault()
      isMoving.value = true
      direction.value = 'LEFT'
    })
  
    onKeyDown(['d', 'D', 'ArrowRight'], (e) => {
      e.preventDefault()
      isMoving.value = true
      direction.value = 'RIGHT'
    })
  
    onKeyUp(['w', 'W', 'ArrowUp'], () => {
      isMoving.value = false
    })
  
    onKeyUp(['s', 'S', 'ArrowDown'], () => {
      isMoving.value = false
    })
  
    onKeyUp(['a', 'A', 'ArrowLeft'], () => {
      isMoving.value = false
    })
  
    onKeyUp(['d', 'D', 'ArrowRight'], () => {
      isMoving.value = false
    })
  }

  const { onLoop } = useRenderLoop()

  onLoop(({ delta }) => {
    if (isMoving.value) {
      const speed = velocity.value
      const frameDecceleration = new Vector3(
        speed.x * decceleration.value.x,
        speed.y * decceleration.value.y,
        speed.z * decceleration.value.z,
      )
      frameDecceleration.multiplyScalar(delta)
      frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(speed.z))

      speed.add(frameDecceleration)

      const _Q = new Quaternion()
      const _A = new Vector3()
      const _R = character.value.quaternion.clone()

      const acc = acceleration.value.clone()

      switch (direction.value) {
        case 'UP':
          speed.z += acc.z * delta
          break
        case 'DOWN':
          speed.z -= acc.z * delta
          break
        case 'LEFT':
          _A.set(0, 1, 0)
          _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.value.y)
          _R.multiply(_Q)
          break
        case 'RIGHT':
          _A.set(0, 1, 0)
          _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.value.y)
          _R.multiply(_Q)
          break
      }

      character.value.quaternion.copy(_R)

      const oldPosition = new Vector3()
      oldPosition.copy(character.value.position)

      const forward = new Vector3(0, 0, 1)
      forward.applyQuaternion(character.value.quaternion)
      forward.normalize()

      const sideways = new Vector3(1, 0, 0)
      sideways.applyQuaternion(character.value.quaternion)
      sideways.normalize()

      sideways.multiplyScalar(speed.x * delta)
      forward.multiplyScalar(speed.z * delta)

      character.value.position.add(forward)
      character.value.position.add(sideways)

      oldPosition.copy(character.value.position)
    }
  })

  return {
    currentAction,
    actions,
    wink,
    openEyes,
    closeEyes,
    changeEyes,
    changeAction,
    greet,
  }
  
}