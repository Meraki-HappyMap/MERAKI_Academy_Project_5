CREATE TABLE roles (
    id SERIAL NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
    id SERIAL NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_permission (
    id SERIAL NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id ) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_id VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20),
      avatar_url VARCHAR(1000),
      role VARCHAR(20) DEFAULT 'user',
      is_verified BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_deleted SMALLINT DEFAULT 0
  )

CREATE TABLE places (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description text NOT NULL,
  user_id INT,
  category_id INT,
  location VARCHAR NOT NULL,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
)

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    place_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

 CREATE TABLE place_images (
   id SERIAL PRIMARY KEY not null,
  place_id INT,
  URL VARCHAR NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
  )

  CREATE TABLE place_videos (
  id SERIAL PRIMARY KEY not null,
  place_id INT,
  URL VARCHAR NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
  )

 CREATE TABLE reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    comment text NOT NULL,
    commenter_id INT,
    rate INT CHECK (rate >= 1 AND rate <= 5) DEFAULT 0 ,
    place_id INT ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted SMALLINT DEFAULT 0 ,
    FOREIGN KEY (commenter_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
    )

  CREATE TABLE booking (
    id SERIAL PRIMARY KEY NOT NULL,
    place_id INT,
    user_id INT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
      
  CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

