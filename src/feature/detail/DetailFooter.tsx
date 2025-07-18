import React, { useState } from 'react'
import { Button } from '@heroui/button'
import { useReactToPrint } from 'react-to-print'
import html2pdf from 'html2pdf.js'
import { format } from 'date-fns'

import { TransactionType } from '@/types/TransactionType'

interface DetailFooterProps {
  contentRef: React.RefObject<HTMLDivElement>
  transaction: TransactionType
  selectedTab: 'merchant' | 'customer'
}

const DetailFooter: React.FC<DetailFooterProps> = ({ contentRef, transaction, selectedTab }) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `transaction-slip-${transaction?.DE11 || 'slip'}`,
    onBeforePrint: async () => {
      if (!contentRef.current) {
        console.error('Content ref is not set')
        alert('Cannot print: No content available')

        return Promise.resolve()
      }
      await new Promise(resolve => setTimeout(resolve, 100))

      return Promise.resolve()
    },
  })

  const handleDownload = () => {
    if (!contentRef.current) {
      console.error('Content ref is not set')
      alert('No content to generate PDF.')

      return
    }
    setIsGenerating(true)
    html2pdf()
      .from(contentRef.current)
      .set({
        filename: `${selectedTab}-${transaction?.DE11 || 'slip'}-${format(
          new Date(),
          'yyyyMMddHHmmss'
        )}.pdf`,
        pagebreak: { mode: 'avoid-all' },
        jsPDF: {
          unit: 'mm',
          format: [80, contentRef.current.offsetHeight + 100],
          orientation: 'portrait',
        },
      })
      .save()
      .catch((err: Error) => {
        console.error('PDF generation failed:', err)
        alert('Failed to generate PDF. Please try again.')
      })
      .finally(() => setIsGenerating(false))
  }

  return (
    <div className="transaction-slip-container mx-auto flex-1 flex-col items-center justify-center rounded p-2">
      <div className="no-print mt-4 flex justify-center gap-x-4">
        <Button
          aria-label="Print transaction slip"
          className="btn btn-primary"
          color={'primary'}
          onPress={() => handlePrint()}
        >
          Print
        </Button>
        <Button
          aria-label="Download transaction slip as PDF"
          className="btn btn-primary"
          color={'primary'}
          disabled={isGenerating}
          onPress={handleDownload}
        >
          {isGenerating ? 'Generating ...' : 'Save E-Receipt'}
        </Button>
      </div>
    </div>
  )
}

export default DetailFooter
