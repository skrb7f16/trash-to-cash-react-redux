import React, { useState } from 'react'
import StepOnePage from './StepOnePage'
import firebaseApp from '../../firebase-service'
import { getDatabase } from 'firebase/database'
import StepTwoPage from './StepTwoPage'
import StepThree from './StepThree'

export default function AddProduct() {

  const [stepNo, SetStepNo] = useState(0);
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)


  return (
    <div style={{minHeight:'85vh'}}>
      {stepNo === 0 ?
        <StepOnePage db={db} SetStepNo={SetStepNo} stepNo={stepNo} /> :
        stepNo === 1 ? <StepTwoPage db={db} SetStepNo={SetStepNo}  stepNo={stepNo}/> :
          <StepThree db={db} SetStepNo={SetStepNo} stepNo={stepNo} />}

    </div>
  )
}
