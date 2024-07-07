<?php

// src/Command/CreateUserCommand.php
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use App\Entity\Order;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

// the name of the command is what users type after "php bin/console"
#[AsCommand(
    name: 'app:import-data',
    description: 'Import data from provided json file.',
    hidden: false
)]

class ImportData extends Command
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $path = realpath('./src/Data/orders.json');

        $jsonData = file_get_contents($path);
        $dataArray = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $io->error('Error in decodify JSON: ' . json_last_error_msg());
            return Command::FAILURE;
        }

        foreach($dataArray as $item){
            $order = new Order();
            $id = (int) $item['id'];
            $date = \Datetime::createFromFormat('Y-m-d H:i:s', $item['date']);
            $lastModified = \Datetime::createFromFormat('Y-m-d H:i:s', $item['last_modified']);

            $order->setId($id);
            $order->setDate($date);
            $order->setCustomer($item['customer']);
            $order->setAddress1($item['address1']);
            $order->setCity($item['city']);
            $order->setPostcode($item['postcode']);
            $order->setCountry($item['country']);
            $order->setAmount($item['amount']);
            $order->setStatus($item['status']);
            $order->setDeleted($item['deleted']);
            $order->setLastModified($lastModified);
            
            $this->entityManager->persist($order);
        }

        $this->entityManager->flush();
        $io->success("Data imported successfully!");

        return Command::SUCCESS;

    }

    protected function configure(): void
    {
        $this
            // the command description shown when running "php bin/console list"
            ->setDescription('This command enables you to load `orders` from a JSON file.')
            // the command help shown when running the command with the "--help" option
            ->setHelp('This command allows you to create a user...')
        ;
    }
}