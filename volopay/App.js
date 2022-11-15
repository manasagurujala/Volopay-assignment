import { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CardItem from "./components/CardItem/index"
import TabItem from './components/TabItem'

import { FcCamcorderPro, FcGrid, FcDatabase, FcFilledFilter, FcSearch } from "react-icons/fc";
import "./App.css"

const tabsList = [
  { tabId: 'YOUR', displayText: 'Yours' },
  { tabId: 'ALL', displayText: 'All' },
  { tabId: 'BLOCKED', displayText: 'Blocked' },]

class AppStore extends Component {
  state = {

    cardList: [],
    CardStatusB: false,
    CardStatusS: false,
    activeTabId: tabsList[1].tabId,
    hasMore: true,
    ApiNumber:10
  }

  setActiveTabId = tabId => {

    this.setState({ activeTabId: tabId })

  }

  SelectBurner = () => {
    this.setState((prevState) => ({ CardStatusB: !prevState.CardStatusB }))
  }

  SelectSub = () => {
    this.setState((prevState) => ({ CardStatusS: !prevState.CardStatusS }))
}

  ApplyChanges = (event) => {
    event.preventDefault()
   this.GetCheckBoxData()
  }

    


  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const { ApiNumber} = this.state
    const response = await fetch(
      `https://636e428d182793016f3b867e.mockapi.io/cards/?page=1&limit=${ApiNumber}`,
    )
    const data = await response.json()

    const Updated = data.map(each => ({

      CompanyName: each.company_name,
      CardHolder: each.card_holder,
      CompanyType: each.company_type,
      CardType: each.card_type,
      ExpiryDate: each.expiry_date,
      ListSpend: each.spent,
      ListA: each.avaible,
      Id: each.id,
      OwnerId: each.owner_id,
      ActiveCategory: each.active_tab,
      Category: each.Category,
      Status: each.status

    }))
    this.setState({ cardList: Updated })

  }

  fetchMoreData =async () => {
    if (this.state.ApiNumber>= 101) {
      this.setState({ hasMore: false });
      return;
    }
   
    setTimeout(() => {
      this.setState((prevState) => ({ApiNumber:prevState.ApiNumber+10 }))
    }, 500);

      const { ApiNumber} = this.state
      console.log(ApiNumber)

      //this.setState((prevState) => ({ApiNumber:prevState.ApiNumber+10 }))
    
      const response = await fetch(
        `https://636e428d182793016f3b867e.mockapi.io/cards/?page=1&limit=${ApiNumber}`,
      )
      const data = await response.json()
  
      const Updated = data.map(each => ({
  
        CompanyName: each.company_name,
        CardHolder: each.card_holder,
        CompanyType: each.company_type,
        CardType: each.card_type,
        ExpiryDate: each.expiry_date,
        ListSpend: each.spent,
        ListA: each.avaible,
        Id: each.id,
        OwnerId: each.owner_id,
        ActiveCategory: each.active_tab,
        Category: each.Category,
        Status: each.status
  
      }))
      this.setState({ cardList: Updated })
      
    }
  GetCheckBoxData=()=>{
    const {CardStatusB,cardList}=this.state
    if (CardStatusB){
      const filtered = cardList.filter(each => each.CardType === "BURNER")
      return filtered
    }
  }
  getActiveTabApps = cardList => {
    const { activeTabId } = this.state

    console.log(activeTabId)
    if (activeTabId === "BLOCKED") {
      const filteredApps = cardList.filter(each => each.Status === "inactive")
      return filteredApps
    }

    else if (activeTabId === "YOUR") {
      const filteredApps = cardList.filter(each => each.OwnerId === 1)
      return filteredApps
    }
   

    const filteredApps = cardList.filter(
      eachS => eachS.Category === activeTabId,
)
    return filteredApps
}
  render() {
    const { activeTabId, cardList } = this.state
    
const result = cardList.reduce((finalArray, current) => {
  let obj = finalArray.find((item) => item.CardHolder === current.CardHolder);
  if (obj) {
    return finalArray;
  }
  return finalArray.concat([current]);
}, []);
 
console.log("result :-> ", result);
   
    const filteredApps = this.getActiveTabApps(cardList)

    return (
      <div className='container_app'>
        <div className='con-heading'>
          <div className='heading-con'>
            <h1 className='heading-app'>Vitrual Cards</h1>
            <p className='para-app'>   <FcCamcorderPro /> Learn more</p>
          </div>
          <div className='virtual-card'>
            <p className='para-cart-vc'> + Vitrual Card</p>

          </div>
        </div>
        <div className='TabList-con'>
          <ul className='tab-list' >
            {tabsList.map(eachTab => (
              <TabItem key={eachTab.tabId} TabDetails={eachTab} setActiveTabId={this.setActiveTabId}
                isActive={activeTabId === eachTab.tabId} />
            ))}

          </ul>

          <div>
            <FcGrid className='small-logo' />
            <FcDatabase className='small-logo'/>
          </div>

        </div>
     
        <div className='pop-con'>

          <Popup trigger={
            <div  >
              <FcSearch />
              <button className='popUpButton'>
                <FcFilledFilter /> Filter
              </button>
            </div>}
            position="left center" >
            <form className='con-filer-pop'>
              <h1 className='heading-pop-up'>Filters</h1>
              <hr className='hr-line' />
              <div className='con-input-checkbox'>
                <p> Type</p>
                <input id="burner" type="checkbox" onClick={this.SelectBurner} />
                <label className='input-label' htmlFor='burner'>Burner</label>
                <input id="sub" type="checkbox" onClick={this.SelectSub} />
                  
                <label className='input-label' htmlFor='sub'>Subcription</label>
              </div>
              <div className='card-con'>
                <p className='cardholder-heading'>card holder</p>
                <select className='select-cardholder'>
                  <option>Select Cardholder</option>
                  { result.map(eachOwner => (
                    <option key={eachOwner.Id} value={eachOwner.CardHolder}>{eachOwner.CardHolder}</option>
                    
                  ))}
               
                </select>
                <div className='button-con'>
                  <button onClick={this.ApplyChanges} className='button-apply'>apply</button>
                  <button className='button-clear'>clear</button>
                </div>
              </div>
            </form>
          </Popup>


        </div>
        <div>
    
        <InfiniteScroll
          dataLength={this.state.ApiNumber}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          
          <ul className='unorderlist-con'>
            {filteredApps.map(each => (

              <CardItem key={each.Id} details={each} cardTypeBurner={each.CardType} />
            ))}
          </ul>
          </InfiniteScroll>

        </div>
      </div>
    )
  }
}
export default AppStore
