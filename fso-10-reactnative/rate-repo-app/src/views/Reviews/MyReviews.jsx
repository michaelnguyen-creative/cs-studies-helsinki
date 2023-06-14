import { FlatList, View, Text } from 'react-native'
import ReviewItem from './ReviewItem'
import { WHOAMI } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import ItemSeparator from '../../components/ItemSeparator'

const NoReview = () => {
  return (
    <View>
      <Text>Seems like you don't have any review yet</Text>
    </View>
  )
}

const ReviewList = ({ listItems }) => {
  return (
    <FlatList
      data={listItems}
      renderItem={({ item }) => <ReviewItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<NoReview />}
      // onEndReached={(info) => console.log(info)}
      // onEndReachedThreshold={0.1}
    />
  )
}

const MyReviews = () => {
  const { data, loading } = useQuery(WHOAMI, {
    variables: { includeReview: true },
    onCompleted: (data) => console.log(data),
  })
  if (loading) return
  const {
    me: { reviews },
  } = data

  const reviewNodes =
    reviews.edges.length !== 0 ? reviews.edges.map(({ node }) => node) : []

  return (
    <View style={{ flex: 1}}>
      <ReviewList listItems={reviewNodes} />
    </View>
  )
}

export default MyReviews
