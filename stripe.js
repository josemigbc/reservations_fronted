import {loadStripe} from '@stripe/stripe-js'
import config from './config'

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY)
export default stripePromise