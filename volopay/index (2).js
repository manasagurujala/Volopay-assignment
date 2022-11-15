
import "./index.css"

const TabItem =(props)=>{
    const {TabDetails,setActiveTabId, isActive}=props
    const {displayText,tabId}=TabDetails
    const presedTab=()=>{
        setActiveTabId(tabId)


    }
    
  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'

    return (
    
        <li className="tab-item">
            <button className={tabBtnClassName} onClick={presedTab} type="button">{displayText}</button>
           
        </li>

        
        
    )
}

export default TabItem