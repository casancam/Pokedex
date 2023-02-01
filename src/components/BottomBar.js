import "./BottomBar.css"

function BottomBar() {
  return (
    <div className="bottom">
    <div className="bottom-btn">
      <p className="bg-circle-white">A</p>
      <p>See Details</p>
    </div>
    <div className="bottom-btn">
      <p className="bg-circle-white">X</p>
      <p>Habitat</p>
    </div>
    <div className="bottom-btn">
      <p className="bg-circle-white">Y</p>
      <p>Sort</p>
    </div>
    <div className="bottom-btn">
      <p className="bg-circle-white">+</p>
      <p>See Evaluation</p>
    </div>
    <div className="bottom-btn">
      <p className="bg-circle-white">B</p>
      <p>Back</p>
    </div>
  </div>
  )
}

export default BottomBar