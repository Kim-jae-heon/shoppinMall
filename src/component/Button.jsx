const Button = ({ text, onClick, width }) => {
  return (
    <button onClick={onClick} className={`mr-2 text-xl border-2 border-zinc-400 p-2 ${width}`}>
      {text}
    </button>
  )
}

export default Button;