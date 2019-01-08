export default {
  'development': [
    {
      id: 'pro',
      sku: 'sku_EHvMIHGeNO3WkR',
      name: '[test] Pro',
      price: 1000,
      description: `
      <p>[pro]</p>
      `,
      image: 'module.png'
    },
    {
      id: 'resource-pack',
      sku: 'sku_EHy4trg94brPma',
      name: '[test] Resource Pack',
      price: 500,
      description: `
      <p>[resource-pack]</p>
      `,
      image: 'module.png'
    },
  ],
  'production': [
    {
      id: 'pro',
      sku: 'sku_E2qQbhA3nruaeC',
      name: 'Pro',
      price: 1000,
      description: `
      <ul>
        <li>Add more than 5 Image, Sound, Atom or Space resources</li>
        <li>Remove pre-game advertising</li>
        <li>Support the continued development of ${process.env.REACT_APP_NAME}</li>
      </ul>
      `,
      image: 'module.png'
    },
    {
      id: 'resource-pack',
      sku: 'sku_EHvW8uNO2bsDRB',
      name: 'Resource Pack',
      price: 500,
      description: `
      <p>
        more resources for you
      </p>
      `,
      image: 'module.png'
    }
  ]
}
