import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceInCents = price * 100; //necessary to convert price to cents for stripe
    const publishableKey = 'pk_test_51IFhIsD86scZCbjBjcBKWwNhP0BXK0pEcgM9IsgZJwa0ECEU9t6GI46P4Q2uWj1tOAIc4KXy9Zx5dyLZwVaOOGL900aetBSuqb';

const onToken = token => {
        console.log(token);
        alert('Payment Sucessful');
    }

    return (
        <StripeCheckout
        label='Pay Now' 
        name='Crown-Clothing Ltd.' 
        billingAddress 
        shippingAddress 
        image='https://svgshare.com/i/Tfs.svg' 
        description={`Your total price $${price}`} 
        amount={priceInCents}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}

        />
    );
};

export default StripeCheckoutButton;