import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { auth } from '@clerk/nextjs/server'

const f = createUploadthing()

const authenticateUser = () => {
  const user = auth()
  console.log('%c [ user ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', user)
  // If you throw, the user will not be able to upload
  if (!user) throw new Error('Unauthorized')
  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return user
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  subaccountLogo: f({ image: { maxFileSize: '16MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => { }),
  avatar: f({ image: { maxFileSize: '16MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => { }),
  agencyLogo: f({ image: { maxFileSize: '16MB', maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete((data) => {
      console.log('%c [ data ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
