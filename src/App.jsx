import { useState, useEffect } from "react";

// 商品データを取得する関数
async function fetchProducts() {
  const response = await fetch(`products.json`);
  return response.json();
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const productData = await fetchProducts();
      setProducts(productData);
    })();
  }, []);

  const productFilter = products.filter((product) => {
    const categoryMatch = category === "all" || product.type === category;

    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // フォームの処理
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchTerm");
    setSearchTerm(searchInput.value);
  };

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>

      <div>
        <aside>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="all">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input type="text" id="searchTerm" placeholder="e.g. beans" />
            </div>
            <div>
              <button>Filter results</button>
            </div>
          </form>
        </aside>

        <main>
          {productFilter.map((product, index) => (
            <section key={index} className={product.type}>
              <h2>
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </h2>
              <p>${product.price.toFixed(2)}</p>
              <img src={`images/${product.image}`} alt={product.name} />
            </section>
          ))}
        </main>
      </div>

      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
