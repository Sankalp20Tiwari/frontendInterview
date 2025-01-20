
import {  useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)


  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100')

    const data = await res.json();
    
    if(data && data.products){
      setProducts(data.products)
    }
  

    console.log(data);
  }

  useEffect(()=> {
    fetchProducts();
  },[])
  return (
    <div >
      {
        products.length > 0 && <div className='products'> 
              {
                products.slice(page *10 -10 , page * 10).map((prod) => {
                  return <span className='products__single' key={prod.id}>
                    <img src={prod.thumbnail}  alt={prod.title} />
                    <span>{prod.title}</span>
                  </span>
                })
              }
        </div>

      }
      {
        products.length > 0 && <div className='pagination'>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
          {
            [...Array(products.length/10)].map((_,index) => {
              return <span key={index } 
               onClick={() => setPage(index + 1)}
               className={page === index + 1 ? 'active' : ''}
               >
                {index + 1}
                </span>
            })
          }
          <button onClick={() => setPage(page + 1)} disabled={page === 10}>Next</button>
        </div>
      }
    </div>
  );
}

export default App;
