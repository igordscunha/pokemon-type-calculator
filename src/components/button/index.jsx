export const Botao = ({cor, texto, onClick}) => {
  const estiloBotao = {
    backgroundColor: cor,
    color: 'white',
    cursor: 'pointer'
  }

  return(
    <button style={estiloBotao} onClick={onClick}>
      {texto}
    </button>
  )
}