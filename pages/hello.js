
const Hello = ({ msg }) => {
  console.log(msg)
  return (
    <div >
      <h1>{JSON.stringify(msg)}</h1>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/hello`)
  console.log(res)
  const msg = await res.json()
  return {
    props: {
      msg,
    },
  }
} 

export default Hello

