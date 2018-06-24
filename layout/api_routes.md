# API Routes

## Signup

- POST /api/signup

  Params: email    string required The email address they want to sign up with
          password string required Their password

  Returns:
  {
    token: "[JWT_token]"
  }

  Description: Route for signing new members up. The email address will be validated
               on the backend. The default display username of the signup will be the
               user portion of their email address, and their avatar will be either
               their Gravatar, if available, or a CSS box with the first letter of
               their email address.

## Login

- POST /api/login

  Params: email    string required The email address they signed up with
          password string required Their password

  Returns:
  {
    token: "[JWT_token]"
  }

  Description: Route for logging members in.

## Songs

- GET /api/songs

  Params: offset    int The index to start pulling results from
          limit     int The maximum number of results to return
          days_ago  int Get songs listed on the nth prior day, where N is the number
                        of days to go back from the current day. If not nil or zero
                        value, this will take precedence over the offset parameter.
          last_days int Get songs listed over all days from the current day back to
                        the nth day. If not nil or zero value, this will take
                        precedence over offest and days_ago parameters.

  Returns:
  {
    data: [{
      id: 123,
      user_id: 123,
      created_at: "2018-06-19T01:00:00.000-7:00",
      title: "Song Title",
      artist: "Artist",
      url: "https://soundcloud.com/song",
      embed_url: "https://embed.soundcloud.com/song",
      tags: ['house'],
      thumbnail: "https://soundcloud.com/images/123.png",
      upvotes: 123,
      comments_count: 12
    }]
  }

  Description: Route for logging members in.