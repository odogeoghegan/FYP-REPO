export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
      }
      Example: {
        Row: {
          createdAt: string
          id: string
          message: string
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          message: string
          name: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          message?: string
          name?: string
          updatedAt?: string
        }
      }
      Follower: {
        Row: {
          createdAt: string
          followerId: string
          id: string
          userId: string
        }
        Insert: {
          createdAt?: string
          followerId: string
          id: string
          userId: string
        }
        Update: {
          createdAt?: string
          followerId?: string
          id?: string
          userId?: string
        }
      }
      Post: {
        Row: {
          authorId: string
          title: string
          createdAt: string
          description: string | null
          id: string
          images: string[] | null
        }
        Insert: {
          authorId: string
          title: string
          createdAt?: string
          description?: string | null
          id: string
          images?: string[] | null
        }
        Update: {
          authorId?: string
          title?: string
          createdAt?: string
          description?: string | null
          id?: string
          images?: string[] | null
        }
      }
      PostComment: {
        Row: {
          authorId: string
          comment: string
          createdAt: string
          id: string
          postId: string
        }
        Insert: {
          authorId: string
          comment: string
          createdAt?: string
          id: string
          postId: string
        }
        Update: {
          authorId?: string
          comment?: string
          createdAt?: string
          id?: string
          postId?: string
        }
      }
      PostLike: {
        Row: {
          createdAt: string
          id: string
          postId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          postId: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          postId?: string
          userId?: string
        }
      }
      Recipe: {
        Row: {
          id: string
          ingredients: string[] | null
          postId: string
          steps: string[] | null
        }
        Insert: {
          id: string
          ingredients?: string[] | null
          postId: string
          steps?: string[] | null
        }
        Update: {
          id?: string
          ingredients?: string[] | null
          postId?: string
          steps?: string[] | null
        }
      }
      Session: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Insert: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
      }
      User: {
        Row: {
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          signupDate: string
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          signupDate?: string
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          signupDate?: string
        }
      }
      VerificationToken: {
        Row: {
          expires: string
          identifier: string
          token: string
        }
        Insert: {
          expires: string
          identifier: string
          token: string
        }
        Update: {
          expires?: string
          identifier?: string
          token?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

