import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import { useLoader } from '@tresjs/core'
import type { Object3D } from 'three'

export interface GLTFLoaderOptions {
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof GLTFLoaderOptions
   */
  draco?: boolean
  /**
   * The path to the Draco decoder.
   *
   * @type {string}
   * @memberof GLTFLoaderOptions
   */
  decoderPath?: string
}

export interface GLTFResult {
  animations: Ref<Array<THREE.AnimationClip>>
  nodes: Ref<Array<Object3D>>
  materials: Ref<Array<THREE.Material>>
  scene: Ref<THREE.Scene>
}

let dracoLoader: DRACOLoader | null = null

/**
 * Sets the extensions for the GLTFLoader.
 *
 * @param {GLTFLoaderOptions} options
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}
 */
function setExtensions(options: GLTFLoaderOptions, extendLoader?: (loader: GLTFLoader) => void) {
  return (loader: GLTFLoader) => {
    if (extendLoader) {
      extendLoader(loader as GLTFLoader)
    }
    if (options.draco) {
      if (!dracoLoader) {
        dracoLoader = new DRACOLoader()
      }
      dracoLoader.setDecoderPath(options.decoderPath || 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
      loader.setDRACOLoader(dracoLoader)
    }
  }
}

/**
 * Loads a GLTF file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @param {GLTFLoaderOptions} [options={
 *     draco: false,
 *   }]
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}  {Promise<GLTFResult>}
 */
export async function useReactiveGLTF(
  path: string | string[],
  options: GLTFLoaderOptions = {
    draco: false,
  },
  extendLoader?: (loader: GLTFLoader) => void,
): Promise<GLTFResult> {
  return toRefs(
    reactive(await useLoader(GLTFLoader, path, setExtensions(options, extendLoader))),
  ) as unknown as GLTFResult
}