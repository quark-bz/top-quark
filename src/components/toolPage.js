export default function toolsPage(){
    return(
        
        <div id="horizontal">
            <span id='textInputTitle'>
                <input id="titleInputMain"type="text" placeholder="Untitled Drawing"></input>

            </span>
            <span id="dirButton">
                <div id='dirButtonContainer'>
                    <button> 
                    </button>
                    <button>

                    </button>
                    <button></button>
                </div>
            </span>
          <span><div id="isPage"><iframe class ="iframeFit" id="iframeFit" src="https://joentze.github.io/ChemicalStructureConstructor/ChemicalStructureConstructor/index.html"></iframe></div></span>
          <span id="funcButton">
            <div id='funcButtonContainer'>
                <button> 
                </button>
                <button>

                </button>
                <button></button>
            </div>
        </span>
        </div>

    )
}