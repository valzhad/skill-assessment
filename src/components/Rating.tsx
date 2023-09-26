import React from 'react'

type StarProps = {
  value: number
  color: string
  threshold: number
  halfThreshold: number
}

const Star: React.FC<StarProps> = ({
  value,
  color,
  threshold,
  halfThreshold,
}) => (
  <span>
    <i
      style={{ color }}
      className={
        value >= threshold
          ? 'fas fa-star'
          : value >= halfThreshold
          ? 'fas fa-star-half-alt'
          : 'far fa-star'
      }
    ></i>
  </span>
)

type RatingProps = {
  value: number
  text: string
  color?: string
}

const Rating: React.FC<RatingProps> = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className="rating">
      {[0, 1, 2, 3, 4].map((threshold) => (
        <Star
          key={threshold}
          value={value}
          color={color}
          threshold={threshold}
          halfThreshold={threshold - 0.5}
        />
      ))}
      <span>{text}</span>
    </div>
  )
}

export default Rating
