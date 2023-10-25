export const outfits = {
  casual: {
    clothes: [{
      name: 'TShirtTres',
    }, {
      name: 'Shorts',
      color: '#978F6C',
    }, {
      name: 'Shoes',
    }],
    accesories: [{
      name: 'EarringCross',
    }],
  },
  slytherin: {
    clothes: [{
      name: 'Shirt',
    }, {
      name: 'Pants',
    }, {
      name: 'SlytherinRobe',
    }, {
      name: 'Shoes',
    }],
    accesories: [{
      name: 'Glasses',
    }, {
      name: 'EarringCross',
    }, {
      name: 'Necktie',
    }],
    objects: [{
      name: 'Wand',
    }],
  },
}

export const useClothes = (character) => {
  const clothes = reactive({})
  const accesories = reactive({})
  const objects = reactive({})

  character.value.traverse((child) => {
    if (child.name.includes('Cloth')) {
      child.visible = false
      clothes[child.name] = child
    }
  })

  character.value.traverse((child) => {
    if (child.name.includes('Accesory')) {
      child.visible = false
      accesories[child.name] = child
    }
  })

  character.value.traverse((child) => {
    if (child.name.includes('Object')) {
      child.visible = false
      objects[child.name] = child
    }
  })

  function setOutfit(outfit) {
    Object.values(clothes).forEach((child) => {
      child.visible = false
    })
    Object.values(accesories).forEach((child) => {
      child.visible = false
    })
    Object.values(objects).forEach((child) => {
      child.visible = false
    })
    outfits[outfit].clothes.forEach((cloth) => {
      if (!clothes[`Cloth${cloth.name}`]) return console.error(`Cloth ${cloth.name} not found`)
      clothes[`Cloth${cloth.name}`].visible = true
      if (cloth.color) clothes[`Cloth${cloth.name}`].material.color.set(cloth.color)
    })
    outfits[outfit].accesories.forEach((accesorie) => {
      if (!accesories[`Accesory${accesorie.name}`]) return console.error(`Accesory ${accesorie.name} not found`)
      accesories[`Accesory${accesorie.name}`].visible = true
      if (accesorie.color) accesories[`Accesory${accesorie.name}`].material.color.set(accesorie.color)
    })
    outfits[outfit].objects?.forEach((accesorie) => {
      if (!objects[`Object${accesorie.name}`]) return console.error(`Object ${accesorie.name} not found`)
      objects[`Object${accesorie.name}`].visible = true
      if (accesorie.color) objects[`Object${accesorie.name}`].material.color.set(accesorie.color)
    })
  }

  return {
    setOutfit,
  }
}
