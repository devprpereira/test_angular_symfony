<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\Persistence\ManagerRegistry;

#[Route('/orders', name: 'app_orders')]
class OrdersController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine){}

    #[Route('/', name: 'app_orders', methods:["GET"])]
    public function get(Request $request, OrderRepository $repository): Response {
        $all = json_encode($repository->findAll());
        return new Response($all);
    }

    #[Route('/create', name: 'app_orders_create', methods:["POST", "PUT"])]
    public function create(Request $request): Response {

        $data = $request->request->all();
        $order = new Order();
        $order->setCustomer($data['customer']);
        $order->setLastModified(new \DateTime("now", new \DateTimeZone("America/Sao_Paulo")));

        $doctrine = $this->doctrine->getManager();
        $doctrine->persist($order);
        $doctrine->flush();

        return $this->json([
            'saved' => $order
        ]);
    }
    
    #[Route('/cancel/{id}', name: 'app_orders_cancel', methods:["PUT"])]
    public function delete(Request $request, string $id, OrderRepository $repository): Response {
        $order = $repository->findOneBy(['id' => $id]);

        if(!$order){
            return $this->json(['status' => 'fail']);
        }

        $order->setStatus('cancelled');
        $doctrine = $this->doctrine->getManager();
        $doctrine->persist($order);
        $doctrine->flush();

        return $this->json([
            'cancelled' => $order
        ]);
    }
}
