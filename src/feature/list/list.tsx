import { useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Spinner } from '@heroui/spinner'
// import { useDispatch } from 'react-redux'

import useMerchantTerminals from '@/hooks/useMerchantTerminals'
import { useAuthToken } from '@/utils/useAuthToken'
import TerminalListItem from '@/components/TerminalListItem'
// import { useNavigate } from 'react-router-dom'
// import { setTerminals } from '@/redux/slices/terminalSlice'

function ListPage() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const { terminals, loading, error, fetchTerminals } = useMerchantTerminals()
  const { getAuthData } = useAuthToken()
  const { merchantId, merchantName } = getAuthData()

  useEffect(() => {
    fetchTerminals(merchantId!)
  }, [fetchTerminals, merchantId])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[40%] items-center justify-center">
        <Card className="w-[70%] p-4">
          <CardHeader>
            <h3 className="text-lg font-bold">Can not Fetch</h3>
          </CardHeader>
          <CardBody>
            <p>{error.message}</p>
          </CardBody>
        </Card>
      </div>
    )
  }
  // const handleMangaeUser = () => {
  //   if (!terminals) return
  //   dispatch(setTerminals(terminals as any))
  //   navigate(`/merchant/users/` + merchantId)
  // }

  return (
    <div className="p-4">
      {/* <UserPageHeader fetchUsersData={fetchUsersData} role={'admin'} /> */}

      {/* <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">Total Terminal: {terminals?.length}</h2>
        <Button className="rounded-md px-4 py-2" onPress={handleMangaeUser}>
          Manage User
        </Button>
      </div> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {terminals && terminals.length > 0 ? (
          terminals.map(terminal => (
            <TerminalListItem
              key={terminal.serial}
              {...terminal}
              merchantName={merchantName || 'Not Added'}
            />
          ))
        ) : (
          <div className="p-4">No terminals found.</div>
        )}
      </div>
    </div>
  )
}

export default ListPage
