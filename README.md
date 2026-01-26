# 🚀 Three-Tier DevOps Project (AWS EKS + GitOps)

A **production-style three-tier application** deployed on **AWS EKS** using **Terraform, Kubernetes, Jenkins, and Argo CD (GitOps)**.  
This project demonstrates **end-to-end DevOps ownership** — from infrastructure provisioning to automated application delivery.

---

## 🧠 Project Overview

This project implements a **three-tier architecture**:

- **Frontend** – User-facing application
- **Backend** – Application logic & APIs
- **Database** – Persistent data storage

The application is deployed on **Kubernetes (EKS)** and managed using **GitOps principles** with **Argo CD**.

---

## 🏗️ Architecture

### Application Architecture

User
|
v
[ Frontend ]
|
v
[ Backend API ]
|
v
[ Database ]


### Platform Architecture

Terraform
|
v
AWS (VPC, IAM, EKS)
|
v
Kubernetes Cluster
|
v
Argo CD (GitOps)
|
v
Application Deployment


---

## ⚙️ Tech Stack

### Cloud & Infrastructure
- AWS
- Amazon EKS
- Terraform
- IAM, VPC, Subnets

### Containerization & Orchestration
- Docker
- Kubernetes

### CI/CD & GitOps
- Jenkins (CI)
- Argo CD (CD / GitOps)

### Web & Networking
- Nginx
- Kubernetes Services & Ingress

---

## 📁 Repository Structure

three-tier-devops-project/
│
├── frontend/ # Frontend application source & Dockerfile
├── backend/ # Backend API source & Dockerfile
├── k8s-manifests/ # Kubernetes manifests
│ ├── frontend.yaml
│ ├── backend.yaml
│ ├── database.yaml
│ └── services.yaml
│
├── jenkins/ # Jenkins pipeline configuration
│ └── Jenkinsfile
│
├── argocd/ # Argo CD application manifests
│
└── README.md


---

## 🔄 CI/CD Workflow

### Continuous Integration (Jenkins)
1. Code pushed to GitHub
2. Jenkins pipeline triggered
3. Docker images built
4. Images pushed to container registry

### Continuous Deployment (Argo CD)
1. Argo CD monitors Git repository
2. Detects changes in Kubernetes manifests
3. Automatically syncs and deploys to EKS
4. Ensures desired state using GitOps

---

## 🚢 Deployment Flow

1. **Provision Infrastructure**
   - EKS cluster created using Terraform  
   - Using separate repository: `terraform-aws-eks-cluster-setup`

2. **Install Argo CD**
   - Deployed inside EKS cluster
   - Connected to this repository

3. **Deploy Application**
   - Kubernetes manifests stored in Git
   - Argo CD syncs and deploys application automatically

---

## 🧪 Key DevOps Concepts Demonstrated

- Infrastructure as Code (Terraform)
- Containerization using Docker
- Kubernetes application deployment
- GitOps-based CD using Argo CD
- CI pipeline using Jenkins
- Separation of Infrastructure and Application repositories
- Production-style cloud-native architecture

---

## 📌 Why This Project Matters

This project is designed to **mirror real-world DevOps workflows**, not toy examples.

It demonstrates:
- Real AWS EKS usage
- GitOps-based deployments
- Scalable and maintainable architecture
- End-to-end DevOps responsibility

---

## 👨‍💻 Author

**Tabish Khatib**  
DevOps Engineer | AWS | Kubernetes | Terraform | GitOps  

🔗 GitHub: https://github.com/syedtabishuddinkhatib-afk

---

## ⭐ Feedback & Contributions

If you find this project useful, feel free to ⭐ the repository.  
Issues and suggestions are always welcome.

![Architectural diagram AWS](https://github.com/user-attachments/assets/b17e3204-9d5d-4fa8-82c0-7cb4b5767d07)


![Architecture diagram ingress](https://github.com/user-attachments/assets/7ac4fc67-8941-41e0-b0ee-339ff2a730de)


<img width="601" height="301" alt="Repo" src="https://github.com/user-attachments/assets/bc9047d2-c976-49d4-b00d-6e4c88219b98" />


![WhatsApp Image 2026-01-26 at 2 06 16 PM](https://github.com/user-attachments/assets/4d885bc1-1095-42a8-998b-b7bc5b8e7069)

