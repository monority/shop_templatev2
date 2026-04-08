import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
  Badge,
  Modal,
  Dropdown,
  Input,
  Textarea,
  Tabs,
  Alert,
  Loading,
  Pagination,
  Tooltip,
} from '../components/ui';
import { useForm } from '../hooks';
import { validationRules } from '../utils/validation';

export default function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Component Showcase
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore all premium UI components
          </p>
        </motion.div>

        {/* Buttons */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>

        {/* Forms */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Forms</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <Input
              {...register('email', validationRules.email)}
              label="Email"
              placeholder="your@email.com"
              error={errors.email?.message}
            />
            <Textarea
              {...register('message')}
              label="Message"
              placeholder="Your message..."
              rows={4}
            />
            <Button type="submit" variant="primary" className="w-full">
              Submit
            </Button>
          </form>
        </Card>

        {/* Modals */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Modals</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal Example"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              This is a modal component with smooth animations.
            </p>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </Modal>
        </Card>

        {/* Dropdowns */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Dropdowns</h2>
          <Dropdown
            trigger={<span>Click me</span>}
            items={[
              { label: 'Option 1', onClick: () => console.log('1') },
              { label: 'Option 2', onClick: () => console.log('2') },
              { label: 'Option 3', onClick: () => console.log('3') },
            ]}
          />
        </Card>

        {/* Tabs */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Tabs</h2>
          <Tabs
            tabs={[
              { label: 'Tab 1', content: <p>Content 1</p> },
              { label: 'Tab 2', content: <p>Content 2</p> },
              { label: 'Tab 3', content: <p>Content 3</p> },
            ]}
          />
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Alerts</h2>
          <div className="space-y-4">
            <Alert variant="success" title="Success">
              Operation completed successfully
            </Alert>
            <Alert variant="error" title="Error">
              Something went wrong
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review before proceeding
            </Alert>
            <Alert variant="info" title="Info">
              Here is some useful information
            </Alert>
          </div>
        </Card>

        {/* Pagination */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Pagination</h2>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </Card>

        {/* Tooltips */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Tooltips</h2>
          <div className="flex gap-8">
            <Tooltip content="Top tooltip" position="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button>Right</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button>Left</Button>
            </Tooltip>
          </div>
        </Card>

        {/* Loading */}
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Loading</h2>
          <div className="flex gap-8">
            <Loading size="sm" />
            <Loading size="md" />
            <Loading size="lg" />
          </div>
        </Card>
      </div>
    </div>
  );
}
