import { ProgressBar } from 'react-bootstrap';
import { AiTwotoneFire } from "react-icons/ai";
import { BsPersonCheckFill } from "react-icons/bs"
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcCancel } from 'react-icons/fc';
import { format } from 'date-fns'
import "./index.css"

const CardItem = (props) => {
    const { details } = props
    const { CardType, CardHolder, ListA,  ListSpend, ExpiryDate, Status,CompanyType, CompanyName } = details
    const { value, currencySpend } = ListSpend

    const { value1, currencyAvailable } = ListA
    const now = ((value - value1) / value) * 100


 
 
    const formattedDate = ExpiryDate ? format(new Date(ExpiryDate), 'MM-dd ') : ''
    const beverage = CardType === "BURNER" ? <AiTwotoneFire color="red" className='img' /> : <BsPersonCheckFill className='img' />;
    const DateLimit = CardType === "BURNER" ? <p>Expires: {formattedDate}</p> : <p>Limit: {value - value1}  {currencyAvailable}</p>
    const initial = CompanyName ? CompanyName[0].toUpperCase() : ''
    const s=Status==="inactive"?<FcCancel className='img-block'/>:beverage
    
    return (
        <div className="Container-big">

            
                    <div className='con-new-one'>
                        <div className='logo-head'>
                            <div className='company-frist'>{initial}</div> 
                            <div>
                                <h1 className='heading'>{CompanyName}   </h1>
                                <p className='para'>{CardHolder} . {CompanyType} </p>
                                <div className='CardTypeCon'>
                                    <p className='CardType'>{CardType}  </p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='image-limit'>
                            <div className='img-con-l'> 
                                <div className='image-con'>
                                    <p>{s}</p>

                                </div>
                            
                            </div>
                            
                            <p className='limit'>    {DateLimit}</p>
                        </div>
                    </div>
            <div>
                <ProgressBar variant='danger' color='yellow' now={now} className="progess" />
            </div>

            <div >
                <div className='con-spend-line'>
                    <div className='spend-con'>
                        <div className='con-spend'>g</div>
                        <p className='spend-avail'>Spend</p>
                    </div>
                    <p className='spend-avail'>{value} {currencySpend}</p>
                </div>
                <div className='con-spend-line'>
                    <div className='spend-con'>
                        <div className='con-avaiable'>g</div>
                        <p className='spend-avail'>avaible to spend</p>

                    </div>
                    <p className='spend-avail'>{value1} {currencyAvailable}</p>
                </div>
            </div>
        </div>
    )
}
export default CardItem