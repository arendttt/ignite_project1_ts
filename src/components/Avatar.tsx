import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean; // interrogação para deixar a propriedade opcional
  src: string;
  alt?: string;
}

export function Avatar({ hasBorder = true, src, alt }: AvatarProps) {
  return (
    <img 
        className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
        src={src}
        alt={alt}
      />
  );
};