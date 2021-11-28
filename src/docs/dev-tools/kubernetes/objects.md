## Objects

`k api-resources` lists all resources types of a cluster.

Object's schema may be explained with `k explain <thing>` (e.g. `k explain node`
or `k explain node.spec`). To see the complete schema use `k explain pods
--recursive`.

### Sections

Objects have sections. Some of them are common, some are different between
object types:

![](https://i.imgur.com/MqdW4JF.png)

All objects have the "Type Metadata" and "Object Metadata" sections. Not all
object types have "Spec" and "Status" sections. Such objects typically are for
static data and do not have an associated controller (e.g. "Event" objects)

"Spec" and "Status" are the most important. User specifies "Spec" and reads
"Status". Controllers are responsible for turning "Spec" into "State". They read
the "Spec" and write the "State":

![](https://i.imgur.com/pstHD4R.png)

#### Type Metadata

`apiVersion` and `kind` specify the API version and the type of the object. API
version is the schema used to describe the object. There can be many versions
for a given object type. Usually only one schema exists for each type.

#### Metadata

`metadata` section contains object's metadata:

- `name`
- `labels`
- `annotations`
- `resourceVersion`
- `managedFields`
- others...

#### Spec

Specific to each object kind. It is used for configuration of the object.

#### Status

It is specific to each object kind. It's the last observed state of the thing
the object represents.

Some "Status" sections have "Condition". It contains vaious factors that
indicate the health of the object. I.e., node has info about PIDPressure,
MemoryPressure, DiskPressure and Ready.

---

Once object is created from a YAML, Kubernetes will add additional information
to it (e.g. `status`, and various metadata). The source YAML != YAML in
Kubernetes
