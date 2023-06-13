import { View } from 'react-native'
import ReviewForm from './ReviewForm'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../../../graphql/mutations'

import { useNavigate } from 'react-router-native'

const CreateReview = () => {
  const navigate = useNavigate()
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (e) => console.log(e),
    onCompleted: (data) => {
      navigate(`/${data.createReview.repositoryId}`)
    },
  })

  const createReview = async ({ rating, ...values }) => {
    await mutate({
      variables: { review: { rating: parseInt(rating), ...values } },
    })
  }
  return (
    <View style={{ flex: 1 }}>
      <ReviewForm createReview={createReview} />
    </View>
  )
}

export default CreateReview
