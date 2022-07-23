import instance from '../Config/axios'

export function getAllProducts(endPoint) {
  return instance.get(endPoint)
}

export function getProductById(id) {
  return instance.get('items/' + id)
}

export function getProductDescriptionById(id) {
  return instance.get('items/' + id + '/description/')
}

export function getProductQuestionsById(id) {
  return instance.get('questions/search?item=' + id + '&limit=10')
}