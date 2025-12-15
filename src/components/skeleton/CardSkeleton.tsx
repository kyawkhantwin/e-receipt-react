import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'

import SkeletonBlock from './SkeletonBlock'

interface CardSkeletonProps {
  count?: number
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-col gap-2 p-4">
            <SkeletonBlock height="h-5" width="w-1/2" />
            <SkeletonBlock height="h-3" width="w-1/3" />
          </CardHeader>

          <CardBody className="space-y-3 p-4">
            <SkeletonBlock />
            <SkeletonBlock width="w-5/6" />
            <SkeletonBlock width="w-2/3" />
          </CardBody>

          <CardFooter className="flex justify-end gap-2 p-4">
            <SkeletonBlock height="h-8" width="w-16" />
            <SkeletonBlock height="h-8" width="w-16" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CardSkeleton
