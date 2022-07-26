### create entities
<ul>
<li>Role entity: ManyToMany(user), role name: string</li>
<li>Action entity: ManyToMany(Role), ManyToOne(Subject), action: ActionEnum</li>
<li>Subject entity: subject name: string</li>
</ul>

### create repositories
<ul>
<li>User Repository: + find all permissions with subject and action relations</li>
<li>Role Repository: crud + add role to user</li>
<li>Action Repository: crud + add action to role [action, subject]</li>
<li>Subject Repository: crud</li>
</ul>

### jwt strategy

<ul>
<li>Add permissions with subject, action relations to jwt payload</li>
</ul>
