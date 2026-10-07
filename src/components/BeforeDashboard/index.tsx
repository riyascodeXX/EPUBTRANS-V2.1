import React from 'react'
import './index.scss'

const BeforeDashboard: React.FC = () => (
  <div className="before-dashboard">
    <h2>EPUBTRANS editorial workspace</h2>
    <p>
      Manage published services, solutions, industries, insights and enquiries. Only approved
      content belongs on the public site.
    </p>
    <ul>
      <li>
        Create a published Page with slug <strong>home</strong> to compose the homepage using
        editorial blocks.
      </li>
      <li>Use Quote Requests to review saved enquiries. Uploaded documents remain private.</li>
      <li>
        Confirm source evidence and permissions before publishing statistics, client logos or case
        studies.
      </li>
    </ul>
    <a href="/" target="_blank" rel="noopener noreferrer">
      View the website
    </a>
  </div>
)
export default BeforeDashboard
