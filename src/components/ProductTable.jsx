function ProductTable({ products, onSaveTitle, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Title (Editable)</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  className="title-input"
                  type="text"
                  defaultValue={product.title}
                  onBlur={(e) => onSaveTitle(product.id, e.target.value)}
                />
              </td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
