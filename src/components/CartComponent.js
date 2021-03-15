/* eslint-disable */
import React, { useReducer, useState } from 'react';
import { Table, Thead, Tbody,Tr, Th, Td, TableCaption, Input } from '@chakra-ui/react';

import productList from '../mockData/productList';
import { actions } from '../constants'

function reducer (products, action) {
  switch (action.type) {
    case actions.EDIT:
      return editProduct(products, action.payload.barcode, action.payload.input)
    default:
      return new Error(`REDUCER ERROR, action.${action.type} not found`)
  }
}

function editProduct(products, barcode, quantity) {  
  let index = products.findIndex(product => product.barcode === barcode)
  let newProducts = [...products];

  // Update product data
  newProducts[index] = {
    ...newProducts[index], 
    quantity: quantity, 
    amount: (parseInt(quantity) * parseInt(newProducts[index].price)).toString() 
  }

  return newProducts;
}

function CartProductItem(props) {
  const handleSubmit = (event) => {
    let barcode = props.value.barcode;
    let input = event.target.value;
    props.onQuantityChange(barcode, input);
    event.preventDefault();
  }

  return (
    <Tr>
      <Td>{props.value.name}</Td>
      <Td>{props.value.price}</Td>
      <Td>
          <Input type="number" defaultValue={props.value.quantity} onChange={handleSubmit}/>
      </Td>
      <Td>{props.value.amount}</Td>
    </Tr>
  );
};

function CartProductList() {
  const [products, dispatch] = useReducer(reducer, productList)

  function handleQuantityChange(barcode, input) {
    dispatch({ type: actions.EDIT, payload: { barcode, input } })
  }

  const listProducts = products.map((product) => 
    <CartProductItem 
      key={product.barcode} // use barcode as list key
      value={product}
      onQuantityChange={handleQuantityChange}
    />
  );

  return (
    <div id="shopping-cart">
      <Table variant="striped">
      <TableCaption>Cart Product List</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price</Th>
          <Th>Quantity</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>

      <Tbody>
        {listProducts}
      </Tbody>
    </Table>
    </div>
  );
}

export default CartProductList ;
