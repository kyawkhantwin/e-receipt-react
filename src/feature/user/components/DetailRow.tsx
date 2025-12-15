import React from 'react'

interface DetailRowProps {
  label: string
  value: string | React.ReactNode
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

export default DetailRow
