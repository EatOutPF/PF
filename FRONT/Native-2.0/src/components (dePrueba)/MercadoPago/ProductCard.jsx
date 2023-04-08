// import React from 'react';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';

// const ProductCard = ({
//   uri,
//   title,
//   amount,
//   description,
//   onPress,
// }) => {
//   const formatMoney = (amount) => {
//     const formatter = new Intl.NumberFormat('es-AR', {
//       style: 'currency',
//       currency: 'ARG',
//     });
//     return formatter.format(amount);
//   };

//   return (
//     <Card style={{ margin: 16 }}>
//       <Card.Cover source={{ uri }} />
//       <Card.Content>
//         <Title>
//           {title} - {formatMoney(amount)}
//         </Title>
//         <Paragraph>{description}</Paragraph>
//       </Card.Content>
//       <Card.Actions>
//         <Button
//           onPress={() =>
//             onPress && onPress({ uri, title, amount, description })
//           }
//         >
//           Buy shoes
//         </Button>
//       </Card.Actions>
//     </Card>
//   );
// };

// export default ProductCard;