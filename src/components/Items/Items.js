import React, { useEffect, useState } from 'react'
import SingleItem from './SingleItem'
import { getDatabase, ref, onValue } from 'firebase/database'
import firebaseApp from '../../firebase-service'
import { SortByDate } from './utils/SortingFunctions'
import './items.css'
import ShowMessage from '../../state/actionCreaters/ShowMessage'
import { useDispatch } from 'react-redux'
import { SearchByKeyWord } from './utils/SearchingFuntions'
export default function Items() {

  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const [item, setItem] = useState([])
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [showSearchWindow, setShowSearchWindow] = useState(false)
  const [searchedItem, setSearchedItem] = useState([])
  const dispatch = useDispatch()
  const HandleSearchKey = (e) => {
    e.preventDefault()
    if (searchKeyWord.length < 3) {
      dispatch(ShowMessage({ message: 'search keyword should be greater than 3 words', type: 'warning' }, 'show'))
      return
    }

    setSearchedItem(SearchByKeyWord(searchKeyWord, item));
    setShowSearchWindow(true)
  }

  const ResetSearch=()=>{
    setSearchKeyWord('')
    setShowSearchWindow(false)
  }

  useEffect(() => {

    const itemRef = ref(db, '/feeds')
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItem([])
        var tempItem = []
        Object.values(data).map(items => {
          if(items.taken===false)
          return tempItem.push(items)

        });
        tempItem.sort((a, b) => {

          return SortByDate(a, b)
        })
        setItem(tempItem)

      }
    });
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position)
    },(e)=>{

    })

  }, [])


  return (
    <>
      <h2 className='text-center'>Latest Products</h2>
      <div className='p-2 m-3 search-bar-style'>
        <input
          className='form-control'
          placeholder='Search by any keyword'
          value={searchKeyWord}
          onChange={e => setSearchKeyWord(e.target.value)}
        />
        <button className='btn btn-primary' onClick={HandleSearchKey}>Search</button>
      </div>
      {!showSearchWindow ? <div className='itemBoxStyle'>

        {item.length > 0 ? item.map((i, key) => {

          return <SingleItem item={i} key={key} />
        }) : "LOADING"}

      </div> : <div>
        <div className="container">
        <h4>Showing results for {searchKeyWord}</h4>
        <button className='btn btn-primary' onClick={ResetSearch}>Reset</button>
        </div>
        <div className='itemBoxStyle'>
        {searchedItem.length > 0 ? searchedItem.map((i, key) => {
          return <SingleItem item={i} key={key} />
        }) : 'No items found'}
        </div>
      </div>}

    </>
  )
}
