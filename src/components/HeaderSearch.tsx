const HeaderSearch: React.FC<{isActive:boolean, handleInputClick: () => void}> = ({isActive, handleInputClick}) => {


    return !isActive ? (

            <input
              type="text"
              className="main-search-bar"
              placeholder="ძიება..."
              onFocus={handleInputClick}
            />
    ) : null 
}

export default HeaderSearch;