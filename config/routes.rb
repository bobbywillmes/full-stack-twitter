Rails.application.routes.draw do
  get '/'    =>   'pages#main'

  scope '/api' do
    # Users
    post '/users'       => 'users#create'
    get '/users'        => 'users#index'

     # SESSIONS
    post '/sessions'            => 'sessions#create'
    get  '/authenticated'       => 'sessions#authenticated'
    delete '/sessions'          => 'sessions#destroy'

      # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'

  end
  
  get '*path' => redirect('/')
  
end
