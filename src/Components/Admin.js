import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import './Admin.css';

const Admin = () => {
  const [activePage, setActivePage] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    status: true,
    images: [],
    sizes: [],
    cid: ''
  });
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    role: 'user'
  });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:9999/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchUsers = () => {
    axios.get('http://localhost:9999/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchCategories = () => {
    axios.get('http://localhost:9999/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleCreateProduct = () => {
    if (editingProduct) {
      // Update existing product
      axios.put(`http://localhost:9999/products/${editingProduct.id}`, newProduct)
        .then(response => {
          setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
          setEditingProduct(null);
          setShowProductModal(false);
          resetNewProduct();
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      // Create new product with auto-incrementing id
      const maxId = Math.max(...products.map(p => parseInt(p.id)), 0);
      const newId = (maxId + 1).toString();
      const productWithId = { ...newProduct, id: newId };
      
      axios.post('http://localhost:9999/products', productWithId)
        .then(response => {
          setProducts([...products, response.data]);
          setShowProductModal(false);
          resetNewProduct();
        })
        .catch(error => console.error('Error creating product:', error));
    }
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      price: 0,
      status: true,
      images: [],
      sizes: [],
      cid: ''
    });
  };

  const handleCreateUser = () => {
    if (editingUser) {
      // Update existing user
      axios.put(`http://localhost:9999/users/${editingUser.id}`, newUser)
        .then(response => {
          setUsers(users.map(u => u.id === editingUser.id ? response.data : u));
          setEditingUser(null);
          setShowUserModal(false);
          setNewUser({
            fullName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            role: 'user' // Default role
          });
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Create new user with auto-incrementing id
      const maxId = Math.max(...users.map(u => parseInt(u.id)), 0);
      const newId = (maxId + 1).toString();
      const userWithId = { ...newUser, id: newId };
      
      axios.post('http://localhost:9999/users', userWithId)
        .then(response => {
          setUsers([...users, response.data]);
          setShowUserModal(false);
          setNewUser({
            fullName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '', // Reset phoneNumber
            role: 'user' // Default role
          });
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:9999/products/${id}`)
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:9999/users/${id}`)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowProductModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setShowUserModal(true);
  };

  const handleAddImage = () => {
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, { id: newProduct.images.length + 1, name: '' }]
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...newProduct.images];
    updatedImages.splice(index, 1);
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleAddSize = () => {
    setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, ''] });
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes.splice(index, 1);
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleImageUrlChange = (index, value) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index].name = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index] = value;
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  return (
    <div>
      <Container className="my-5 dashboard-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Dashboard</h3>
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => setActivePage('products')}>
              <a href="#">Manage Products</a>
            </li>
            <li onClick={() => setActivePage('users')}>
              <a href="#">Manage Users</a>
            </li>
          </ul>
        </div>

        <div className="main-content">
          {activePage === 'products' && (
            <div id="products">
              <h2>Manage Products</h2>
              <Button className="btn-custom" onClick={() => {
                setEditingProduct(null);
                resetNewProduct();
                setShowProductModal(true);
              }}>
                Create Product
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{categories.find(c => c.id === product.cid)?.name || 'N/A'}</td>
                      <td>{product.status ? 'In Stock' : 'Out of Stock'}</td>
                      <td>
                        <Button className="btn-custom" onClick={() => handleEditProduct(product)}>
                          Edit
                        </Button>
                        <Button className="btn-custom btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {activePage === 'users' && (
            <div id="users">
              <h2>Manage Users</h2>
              <Button className="btn-custom" onClick={() => {
                  setEditingUser(null);
                  setNewUser({
                    fullName: '',
                    email: '',
                    password: '',
                    address: '',
                    phoneNumber: '', // Reset phoneNumber
                    role: 'user' // Default role
                  });
                  setShowUserModal(true);
                }}>
                Create User
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button className="btn-custom" onClick={() => handleEditUser(user)}>
                          Edit
                        </Button>
                        <Button className="btn-custom btn-danger" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Container>

      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Create Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="productStatus">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="checkbox"
                label="In Stock"
                checked={newProduct.status}
                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.checked })}
              />
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={newProduct.cid}
                onChange={(e) => setNewProduct({ ...newProduct, cid: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              {newProduct.images.map((image, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={image.name}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  />
                  <Button className="btn-custom btn-danger" onClick={() => handleRemoveImage(index)}>Remove</Button>
                </div>
              ))}
              <Button className="btn-custom" onClick={handleAddImage}>Add Image</Button>
            </Form.Group>

            <Form.Group controlId="productSizes">
              <Form.Label>Sizes</Form.Label>
              {newProduct.sizes.map((size, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                  />
                  <Button className="btn-custom btn-danger" onClick={() => handleRemoveSize(index)}>Remove</Button>
                </div>
              ))}
              <Button className="btn-custom" onClick={handleAddSize}>Add Size</Button>
            </Form.Group>

            <Button className="btn-custom" onClick={handleCreateProduct}>
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Edit User' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="userAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="userPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={newUser.phoneNumber}
                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="userRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Button className="btn-custom" onClick={handleCreateUser}>
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;
