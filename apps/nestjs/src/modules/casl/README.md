# Role Based Access Control

## Usage

### Create Role
</br>

<li>First you should create a role like `Admin`, `Moderator`, `Guest` </li>

<li>Go createPermission in graphql and create one or more.</li>
</br>

### Create Subject

<li>Now you should declare a subject, subject means collection or module like `BLOG`, `TODO`, `POST` </li>

<li>Its only a string just like role, we will use it in resolver level soon. Go createSubject in graphql and create one or more. </li>
</br>

### Create Permission

<li>Select a subject which is you want to create permission on it</li>

<li>Go createPermission in graphql and create permissions for crud with giving subject id</li>

</br>

```json
{
  "permission": {
    "action": "CREATE",
    "subject": {
      "name": "BLOG"
    }
  }
}
```

### Add Permissions To Role

<li>Go addPermissionToRole in graphql then add with permission id and role id</li>
</br>

```json
{
  "role": {
    "name": "Admin",
    "permissions": [
      {
        "action": "CREATE",
        "subject": {
          "name": "BLOG"
        }
      },
      {
        "action": "READ",
        "subject": {
          "name": "BLOG"
        }
      },
      {
        "action": "DELETE",
        "subject": {
          "name": "BLOG"
        }
      },
      {
        "action": "UPDATE",
        "subject": {
          "name": "BLOG"
        }
      }
    ]
  }
}
```
</br>

### Permission Guard and Checker
</br>

```typescript
@UseGuards(PermissionsGuard)
@CheckPermissions([ActionEnum.CREATE, "BLOG"])
@Mutation(() => Blog)
async createAdminRole(@Args('data') data: CreateBlogInput): Promise<Blog> {
    return await this.blogService.createBlog(data)
}
```

<li>Now user need role like this for access the mutation</li>
</br>

```json
{
  "role": {
    "name": "whatever",
    "permissions": [
      {
        "action": "CREATE",
        "subject": {
          "name": "BLOG"
        }
      }
    ]
  }

}
```
</br>

<li>BLOG is subject you created in database before, and action comes from permission with subject. Permission Guard will find all permissions from user's roles and CheckPermissions will check is user have this permission.</li>
</br>

```typescript
@CheckPermissions([ActionEnum.CREATE, "BLOG"])
```