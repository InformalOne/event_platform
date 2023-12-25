import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';

import { IEvent } from '@/lib/databse/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Movie Purchased! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Failed Purchase -- browse through movies and select your favorite ones.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Movie' : 'Buy Movie'}
      </Button>
    </form>
  )
}

export default Checkout