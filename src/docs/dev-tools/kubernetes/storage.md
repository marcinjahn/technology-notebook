# Storage

## Volumes

![](https://i.imgur.com/nPKhzLL.png)

![](https://i.imgur.com/qMFmqlN.png)

Volume types:

- emptyDir - a simple directory. Preserved for the pod existence time. Multiple
  containers in a pod can share data this way. It can be backed by a dir on a
  node, or tmpfs on a node
- hostPath - worker node's path. It's dangerous, because pod may get access to
  all files on the node.
- nfs
- azureFile
- azureDisk
- persistentVolumeClaim
- ...

Different types have different configuration options. E.g., `emptyDir` can have
"medium" and "sizeLimit" configured.

Volumes can be mounted as read/write, or read-only. In multi-mount situations,
depending on the provider, only one, or many pods can write to the same volume.

### Persistent Volumes

The direct volume mounting described above is problematic, because it exposes
the details about the volume to pod/deployment definition (e.g., I'd have to
specify the URL of NFS storage there, or I have to specify that Azure infra is
used for storage). This makes the manifests tied to a specific cloud provider.

![](https://i.imgur.com/tH4mCzX.png)

Additional objects were introduced to abstract the storage info away:

![](https://i.imgur.com/vN89M9j.png)

The volume providing is divided between two personas:

- cluster admins - defines available *PersistentVolumes*
- cluster user/dev - requests storage for their app using
  *PersistentVolumeClaim*.

Storage objects:

- **Persistent Volume** - represents a storage volume; it stores information
  about it;
- **Persistent Volume Claim** - represents user's claim on the persistent
  volume. Its lifecycle is not tied to that of a pod, so the ownership of the
  persistent volume is decoupled from the pod. To use a persistent volume, user
  first needs to claim it. When the volume is no longer needed, the user
  releases it by deleting the claim object.

To use the volume, pod needs to refer to a PersistentVolumeClaim that is bound
to a PersistentVolume. The claim might either reference exact name of the
PersistentVolume, or just list requirements to allow K8s to bind any fitting
PersistentVolume to it.

Multiple pods can use the same volume by referencing the same claim. Depending
on the storage type, access will be enabled or not. E.g., some storage providers
allow write from one node only (so multiple pods on that node can write). Other
nodes cannot write.

PV that is ready to be claimed has "Available" status.

#### Reclaim Policies

PV can configure its reclaim policy:

- **Retain** - when PVC is deleted, the PV becomes "Released", the volume is
  retained. Admin must manualy remove it. If a PV is claimed, and then the PVC
  is deleted, the PV's Status becomes "Released", it cannot be claimed in this
  state. It can be claimed again if the object gets edited and the
  `.spec.claimRef` gets removed (or the whole PV needs to be deleted and then
  recreated). If PV gets deleted, the data stays in tact.
- **Delete** - when PVC is deleted, the PV and the underlying data are deleted
  as well. It is used with the autoamtically provisioned PVs.

PV is just a pointer to the data.

#### Access Modes

Access Modes of a PersistentVolume refer to how many nodes can mount it (not
pods). Types:

- *ReadWriteOnce* - only one node can mount it in read/write mode. Others can't
  mount it at all.
- *ReadOnlyMany* - many nodes can mount it in read-only mode
- *ReadWriteMany* - many nodes can mount it in read/write mode.

A PersistentVolume can support multiple modes.

#### Deletion

Deleting a PV will await for a bound PVC to be deleted. Deleting a PVC will
await for a bound pod to be deleted.

#### Auto Provisioning

PersistentVolumes might also be created automatically on-demand as needed, if
the automated provisioner is installed (e.g. AKS creates Azure Disk
automatically when it's needed).

![](https://i.imgur.com/UT7ZnCU.png)

Here, the order gets reversed. Instead of creating a PVC for a pre-existing PV,
a PVC gets created first, and then a proper PV gets created by a provisioner.

##### Storage Class

Cloud provider offers some *StorageClasses* (e.g. Azure offers AzureDisk and
AzureFile). A PVC should contain information which StorageClass it expects.

The PVC uses `storageClassName` to choose Storage Class. If it's ommited, cloud
providers have some default choice. Setting `storageClassName` to `""` disables
dynamic provisioning and causes an existing PV to be selected for binding.

Depending on K8s implementation, creating new PVC with some storageClass will
instantiate the PV immediately, or only after some pod actually will need some
storage (using our PVC). E.g., GKE will create PV immediately, while kind will
wait for pod. This is because kind create local storage and it needs to know
where a pod will be scheduled (on which node) to create the storage there. The
behaviour is controlled with the "volume binding mode" config of a storage
class.

We can define our own storageClasses.