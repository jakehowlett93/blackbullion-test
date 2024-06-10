import { Text, StyleSheet, TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'overlay';
  color?: string;
};

export function ThemedText({
  style,
  color,
  type = 'default',
  ...rest
}: ThemedTextProps) {

return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'overlay' ? styles.overlay : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#663C97'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#663C97'
  },
  overlay: {
    fontSize: 14,
    color: 'black',
  }
});
