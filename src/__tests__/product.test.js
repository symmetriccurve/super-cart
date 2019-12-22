import React from 'react';
import { shallow, mount, render } from '../../enzyme.config';
import { Product } from '../components/Product'

describe('Login Test Suite', () => {
    const fakeProductName = "someName",
          fakeProductPrice = "200",
          fakeProductId = "0",
          fakeProductImage="www.lorempixel.com/200/200"

    it('should render the Product', () => {
        const wrapper = shallow(<Product 
            name={fakeProductName}
            price={fakeProductPrice}
            id={fakeProductId}
            image={fakeProductImage}
        />);
        expect(wrapper.find('#product').exists()).toBe(false);
    })
})