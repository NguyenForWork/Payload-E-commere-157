// import type { CollectionConfig } from 'payload/types'

// import { admins } from '../../access/admins'
// import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
// import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
// import { clearUserCart } from './hooks/clearUserCart'
// import { populateOrderedBy } from './hooks/populateOrderedBy'
// import { updateUserPurchases } from './hooks/updateUserPurchases'
// import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'

// export const Orders: CollectionConfig = {
//   slug: 'orders',
//   admin: {
//     useAsTitle: 'createdAt',
//     defaultColumns: ['createdAt', 'orderedBy'],
//     preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
//   },
//   hooks: {
//     afterChange: [updateUserPurchases, clearUserCart],
//   },
//   access: {
//     read: adminsOrOrderedBy,
//     update: admins,
//     create: adminsOrLoggedIn,
//     delete: admins,
//   },
//   fields: [
//     {
//       name: 'orderedBy',
//       type: 'relationship',
//       relationTo: 'users',
//       hooks: {
//         beforeChange: [populateOrderedBy],
//       },
//     },
//     {
//       name: 'stripePaymentIntentID',
//       label: 'Stripe Payment Intent ID',
//       type: 'text',
//       admin: {
//         position: 'sidebar',
//         components: {
//           Field: LinkToPaymentIntent,
//         },
//       },
//     },
//     {
//       name: 'total',
//       type: 'number',
//       required: true,
//       min: 0,
//     },
//     {
//       name: 'items',
//       type: 'array',
//       fields: [
//         {
//           name: 'product',
//           type: 'relationship',
//           relationTo: 'products',
//           required: true,
//         },
//         {
//           name: 'price',
//           type: 'number',
//           min: 0,
//         },
//         {
//           name: 'quantity',
//           type: 'number',
//           min: 0,
//         },
//       ],
//     },
//   ],
// }
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      type: 'text',
      admin: {
        position: 'sidebar',
        components: {
          Field: LinkToPaymentIntent,
        },
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Địa chỉ',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Thành phố',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      label: 'Bang/Tỉnh',
      required: false,
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Họ và tên',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Địa chỉ email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      required: true,
    },
  ],
}
