import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError as resetProductStatus,
  editSingleProduct,
  deleteSingleProduct,
} from '../slices/product/productSlice';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';

const AddNewProduct = () => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  return <div>ADD PRODUCT</div>;
};

export default AddNewProduct;
