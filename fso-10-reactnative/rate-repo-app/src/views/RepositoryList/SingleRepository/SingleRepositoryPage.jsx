import { View, Button, Pressable, Text, FlatList } from 'react-native'
import { useParams, Link } from 'react-router-native'
import * as Linking from 'expo-linking'

import ReviewItem from '../../Reviews/ReviewItem'
import RepositoryItem from '../RepositoryItem'
import ItemSeparator from '../../../components/ItemSeparator'

import { useRepository } from '../../../hooks/useRepository'

import { CREATE_REVIEW } from '../../../graphql/mutations'
import { useMutation } from '@apollo/client'
// const SingleRepositoryHeader = () => {
//   return (

//   )
// }

const RepositoryContainer = ({ data, onEndReached }) => {
  const openLink = async () => {
    await Linking.openURL(data.url)
  }
  const reviewNodes = data.reviews
    ? data.reviews.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryItem item={data}>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Open in GitHub" onPress={openLink} />
            <Pressable style={{ backgroundColor: 'blue', padding: 3, justifyContent: 'center' }}>
              <Link to="/create-review">
                <Text style={{ color: 'white' }}>Create a review</Text>
              </Link>
            </Pressable>
          </View>
        </RepositoryItem>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  )
}

const SingleRepositoryPage = () => {
  const repositoryId = useParams().repoId
  const { loading, ...result } = useRepository({
    repositoryId,
    first: 3,
  })
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (e) => console.log(e),
    onCompleted: (data) => {
      navigate(`/${data.createReview.repositoryId}`)
    },
  })

  if (loading) return
  const {
    data: { repository },
  } = result

  const fetchMoreReviews = () => result.fetchMoreReviews()

  return (
    <RepositoryContainer data={repository} onEndReached={fetchMoreReviews} />
  )
}

export default SingleRepositoryPage
