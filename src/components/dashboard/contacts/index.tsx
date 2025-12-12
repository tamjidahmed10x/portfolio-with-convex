import React from 'react'
import { IconMail, IconPhone, IconTrash, IconCheck } from '@tabler/icons-react'

const demoContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    message: 'Hi, I would like to discuss a potential project collaboration...',
    date: '2025-12-08',
    status: 'New',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah.smith@company.com',
    phone: '+1 234 567 8901',
    message: 'Interested in hiring you for a frontend development position.',
    date: '2025-12-07',
    status: 'Read',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.j@startup.io',
    phone: '+1 234 567 8902',
    message: 'We are looking for a technical co-founder. Are you interested?',
    date: '2025-12-06',
    status: 'Replied',
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.brown@agency.com',
    phone: '+1 234 567 8903',
    message:
      'Would love to get a quote for our upcoming web application project.',
    date: '2025-12-05',
    status: 'New',
  },
]

export function Contacts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Contacts
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          View and manage contact messages from visitors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            2
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            New Messages
          </div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            1
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Replied
          </div>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            4
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Total Contacts
          </div>
        </div>
      </div>

      {/* Contact Messages */}
      <div className="space-y-4">
        {demoContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {contact.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.status === 'New'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : contact.status === 'Read'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <IconMail className="w-4 h-4" />
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <IconPhone className="w-4 h-4" />
                    {contact.phone}
                  </div>
                </div>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {contact.date}
              </div>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {contact.message}
            </p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                <IconCheck className="w-4 h-4" />
                Mark as Read
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors">
                Reply
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors">
                <IconTrash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contacts
