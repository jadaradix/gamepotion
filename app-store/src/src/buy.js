import api from './api'
import { store } from './inter-router'

const createTransaction = (module) => {
  return api.post('api-core', 'me/transactions', {
    moduleId: module.id,
    total: module.price
  })
}

const getStripeApiKey = (environment) => {
  const apiKeys = {
    'development': 'pk_test_33dlIhLTnNUvvTtI78jqsW8r',
    'production': 'pk_live_U3YPFBkOK2iPn2T6owzt6Z6l'
  }
  return apiKeys[environment]
}

const STRIPE_API_KEY = getStripeApiKey(process.env.NODE_ENV)
const callbackUrl = store(process.env.NODE_ENV)

const buy = async (module) => {
  const transaction = await createTransaction(module)
  const stripe = window.Stripe(STRIPE_API_KEY, {betas: ['checkout_beta_4']})
  stripe.redirectToCheckout({
    clientReferenceId: transaction.id,
    items: [
      {sku: module.sku, quantity: 1}
    ],
    successUrl: `${callbackUrl}?callback=good`,
    cancelUrl: `${callbackUrl}?callback=bad`,
  })
}

export default buy
