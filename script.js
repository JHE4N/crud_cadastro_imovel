const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPreco = document.querySelector('#m-preco')
const sArea = document.querySelector('#m-area')
const sTipo = document.querySelector('#m-tipo')         //new
const sEndereco = document.querySelector('#m-endereco') //neW
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sPreco.value = itens[index].preco
    sArea.value = itens[index].area
    sTipo.value = itens[index].tipo
    sEndereco.value = itens[index].endereco
    id = index
  } else {
    sNome.value = ''
    sPreco.value = ''
    sArea.value = ''
    sTipo.value = ''
    sEndereco.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.tipo}</td>
    <td>R$${item.preco}</td>
    <td>${item.area} m²</td>
    <td>${item.endereco}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sPreco.value == '' || sArea.value == '' || sEndereco) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].preco = sPreco.value
    itens[id].salario = sPreco.value
    itens[id].area = sArea.value
    itens[id].endereco = sEndereco.value
  } else {
    itens.push({'nome': sNome.value, 'preco': sPreco.value, 'area': sArea.value, 'endereco': sEndereco})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()